/* eslint-disable @typescript-eslint/no-explicit-any */
type TCatalog = {
    [key: string]: {
        [key: string]: {
            name: string
            path: string
            instance: any
            methods: {
                [key: string]: {
                    [key: string]: {
                        fn_name?: string
                    }
                }
            }
        }
    }
}

const catalog: TCatalog = {};

export default catalog;