export interface ModelAssetValidationResult {
  valid: boolean;
  status: 'available' | 'missing' | 'invalid_format' | 'network_error';
  reason: string;
}

// In-memory cache for validated model assets to avoid redundant network roundtrips
const validationCache = new Map<string, ModelAssetValidationResult>();

/**
 * Validates whether a 3D GLB/GLTF model asset exists and is a valid binary asset,
 * preventing SPA fallback HTML pages from being parsed by Three.js GLTFLoader.
 * Results are cached in memory for sub-millisecond subsequent lookups.
 */
export async function validateModelAsset(
  url: string,
  timeoutMs = 5000
): Promise<ModelAssetValidationResult> {
  // Check memory cache first
  const cached = validationCache.get(url);
  if (cached && cached.valid) {
    return cached;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Range: 'bytes=0-15',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // 1. If HTTP status is not 200 or 206 (Partial Content)
    if (!response.ok && response.status !== 206) {
      return {
        valid: false,
        status: 'missing',
        reason: `Model asset not found on server (HTTP ${response.status})`,
      };
    }

    // 2. Check Content-Type header
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html') || contentType.includes('application/xhtml+xml')) {
      return {
        valid: false,
        status: 'missing',
        reason: 'Server returned HTML page (SPA routing fallback) instead of 3D GLB model',
      };
    }

    // 3. Inspect binary magic header (first 4-16 bytes)
    const blob = await response.blob();
    const slice = blob.slice(0, 16);
    const arrayBuffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    if (bytes.length < 4) {
      return {
        valid: false,
        status: 'invalid_format',
        reason: 'Asset file is empty or too small to be a 3D model',
      };
    }

    // Check for GLB binary header: 0x67 0x6C 0x54 0x46 ("glTF" in ASCII)
    const isGlb =
      bytes[0] === 0x67 &&
      bytes[1] === 0x6c &&
      bytes[2] === 0x54 &&
      bytes[3] === 0x46;

    // Check for GLTF text header: starts with '{' (JSON)
    const isGltfJson = bytes[0] === 0x7b;

    // Check if it's HTML (starts with '<' e.g. '<!DOCTYPE' or '<html>')
    const isHtml = bytes[0] === 0x3c;

    if (isHtml) {
      return {
        valid: false,
        status: 'missing',
        reason: 'Asset content is HTML text, not a GLB binary asset',
      };
    }

    if (!isGlb && !isGltfJson) {
      return {
        valid: false,
        status: 'invalid_format',
        reason: 'Asset does not have a valid glTF/GLB magic header signature',
      };
    }

    const successResult: ModelAssetValidationResult = {
      valid: true,
      status: 'available',
      reason: 'Valid 3D model asset verified',
    };

    // Cache valid result
    validationCache.set(url, successResult);
    return successResult;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      valid: false,
      status: 'network_error',
      reason: `Could not verify model asset: ${errorMsg}`,
    };
  }
}
