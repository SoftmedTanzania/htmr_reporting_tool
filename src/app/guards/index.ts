import {UserExistsGuards} from './user.exists';
import {FormsGuard} from './forms.exist';

export const guards: any[] = [UserExistsGuards, FormsGuard];

