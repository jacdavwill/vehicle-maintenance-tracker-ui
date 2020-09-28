import '@nuxtjs/axios';
import { Module } from '@nuxt/types';
import { VuetifyDialog } from 'vuetify-dialog';
declare module '@nuxt/types' {
  interface Context {
    $dialog: VuetifyDialog & {
      authRefreshRequired: (params: any) => Promise<any>;
    };
  }
}
declare module 'vuex/types/index' {
  interface Store<S> {
    $dialog: VuetifyDialog;
  }
}
declare module 'axios' {
  interface AxiosRequestConfig {
    noAutoError?: boolean;
  }
}
export declare const meta: any;
