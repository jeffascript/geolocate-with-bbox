import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

export function createCtx<T>(defaultValue: T) {
    type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;

    const defaultUpdate: UpdateType = () => defaultValue;

    const ctx = createContext({
        geoMode: defaultValue,
        updateGeoMode: defaultUpdate,
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    function Provider(props: PropsWithChildren<{}>) {
        const [geoMode, updateGeoMode] = useState(defaultValue);

        return <ctx.Provider value={{ geoMode, updateGeoMode }} {...props} />;
    }

    return [ctx, Provider] as const;
}
