import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "utils";
/**
 * 返回页面 url 中，指定键的参数值
 * @param keys 
 *  - keys 的类型“{ [x: string]: string; }”缺少类型“{ name: string; personId: string; }”中的以下属性: name, personId
 *  - 由于数据的下游要求指定的 key name 且是 string 类型，因此 keys 需要设定为泛型以做兼容
 *  - 计算属性名的类型必须为 "string"、"number"、"symbol" 或 "any"。泛型 K 需要 `extends string` 约束
 * @returns 
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams()
    return [
        useMemo(
            () => keys.reduce((prev, key) => {
                // searchParams.get 可能会返回 null，需要预设值来兼容
                return { ...prev, [key]: searchParams.get(key) || "" };
                // 初始值会对类型造成影响，需要手动指定
            }, {} as { [key in K]: string }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParams(o)
        },
    ] as const
}
