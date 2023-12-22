export interface HttpPostConfig {
    url: string;
    body: any;
    headers?: {
        [header: string]: string | string[];
    };
}

export interface HttpGetConfig {
    url: string;
    params?: {
        [param: string]: string | string[];
    };
    headers?: {
        [header: string]: string | string[];
    };
}

export interface HttpPutConfig {
    url: string;
    body: any;
    headers?: {
        [header: string]: string | string[];
    };
}

export interface HttpDeleteConfig {
    url: string;
    headers?: {
        [header: string]: string | string[];
    };
}
