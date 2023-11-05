import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { Project } from "screens/ProjectList/components/List";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();

    useEffect(() => {
        run(client("projects", { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);

    return result
}
