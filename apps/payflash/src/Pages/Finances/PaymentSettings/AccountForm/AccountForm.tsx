import React from 'react';
import { DrawerForm, DrawerFormProps } from '@my-monorepo/ui';
import { IAccountTableProps } from '../IAccountProps';
export const AccountForm = ({ title,
                            width,
                            onClose,
                            open,
                            styles,
                            footer,
                            closeIcon,
                            formikFormProps
                        } : DrawerFormProps<IAccountTableProps>) => {
                            return (
                                <DrawerForm
                                    title={title}
                                    width={width}
                                    onClose={onClose}
                                    open={open}
                                    styles={styles}
                                    footer={footer}
                                    closeIcon={closeIcon}
                                    formikFormProps={formikFormProps}
                                />
                            )
                        }
