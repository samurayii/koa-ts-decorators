export interface IKoaDConfig {
    listening?: string,
    keys?: string[]
    env?: string
    proxy?: boolean
    prefix?: string
    enable?: boolean
    subdomain_offset?: number
    proxy_header?: string
    ips_count?: number
}