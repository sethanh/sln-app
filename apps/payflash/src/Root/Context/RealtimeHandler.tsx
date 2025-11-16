import { PropsWithChildren } from 'react';
import { useDataModified } from './hooks/useDataModified';

export const RealtimeHandler = ({ children }: PropsWithChildren) => {
    useDataModified();
    return children;
};
