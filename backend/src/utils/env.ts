export function getEnv(key: string) {
    // eslint-disable-next-line security/detect-object-injection
    return process.env[key] || ''
}
