export interface FileUpload {
    readonly id?: string;
    readonly fileName?: string;
    readonly relativePath?: string;
    readonly contentType?: string;
    readonly size?: number;
}