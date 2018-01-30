import {UserExistsGuards} from './user.exists';
import {FormsGuard} from './forms.exist';
import {AuthGuard} from './auth-guards.service';

export const guards: any[] = [UserExistsGuards, FormsGuard, AuthGuard];

