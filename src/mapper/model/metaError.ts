
export type MapperErrorCode = "BooleanMapper" | "ArrayMapper" | "DateMapper" | "StringMapper" | "NumberMapper" | "ObjectMapper" | "EnumMapper" |
    "Mismatch" | "Validation";

export interface MapperError {
    code: MapperErrorCode | string;
    name: string;
    reason: string;
}
