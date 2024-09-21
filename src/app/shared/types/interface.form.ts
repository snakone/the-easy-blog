import { FormControl } from "@angular/forms";
import { PostCategory } from "./interface.post";

export interface SignInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface SignUpForm {
  name: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<string>;
  password: FormControl<string>;
  password2?: FormControl<string>;
}

export interface EditProfileForm {
  name: FormControl<string>;
  role: FormControl<string>;
  bio: FormControl<string>;
  twitter: FormControl<string>;
  github: FormControl<string>;
  portfolio: FormControl<string>;
}

export interface CreateDraftForm {
  title: FormControl<string>;
  category: FormControl<PostCategory>;
  cover: FormControl<string>;
  intro: FormControl<string>;
}