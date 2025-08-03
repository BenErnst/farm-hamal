import { Toast, type ToastMessage } from 'primereact/toast';
import type { RefObject } from 'react';


class ToastServiceClass {
    private toastRef: RefObject<Toast | null> | null = null;

    // Set the toast reference (called from App component)
    setToastRef(ref: RefObject<Toast | null>) {
        this.toastRef = ref;
    }

    showSuccessMsg(msg: string) {
        this.toastRef?.current?.show({
            severity: 'success',
            ...this.getMessage(msg)
        });
    }

    showErrorMsg(msg: string) {
        this.toastRef?.current?.show({
            severity: 'error',
            ...this.getMessage(msg)
        });
    }

    getMessage(msg: string) {
        return {
            summary: msg,
            life: 3000
        } as ToastMessage;
    }

}

export const ToastService = new ToastServiceClass();
