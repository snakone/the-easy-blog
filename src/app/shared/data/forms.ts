import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateDraftForm, EditProfileForm, SignInForm, SignUpForm } from "@shared/types/interface.form";
import { IMAGE_PATTERN, URL_PATTERN, USER_NAME_PATTERN } from "./patterns";
import { User } from "@shared/types/interface.user";
import { PostCategory } from "@shared/types/interface.post";

export const SIGN_UP_FORM: SignUpForm = {
  name: new FormControl<string>(null, [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(25),
    Validators.pattern(USER_NAME_PATTERN)
  ]),
  email: new FormControl<string>(null, [
     Validators.required,
     Validators.email,
     Validators.maxLength(35)
  ]),
  role: new FormControl<string>(null, [
    Validators.maxLength(35)
  ]),
  password: new FormControl<string>(null, [
     Validators.required,
     Validators.minLength(5),
     Validators.maxLength(25)
  ])
};

export const SIGN_IN_FORM = () => new FormGroup<SignInForm>({
  email: new FormControl<string>(null, [
     Validators.required,
     Validators.email,
     Validators.maxLength(35)
  ]),
  password: new FormControl<string>(null, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
  ])
});

export const EDIT_PROFILE_FORM = (user: User) => new FormGroup<EditProfileForm>({
  name: new FormControl<string>(
    user.name || null,
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(USER_NAME_PATTERN)
    ]
  ),
  role: new FormControl<string>(
    user.profile.role || null, [
      Validators.maxLength(35)
    ]
  ),
  bio: new FormControl<string>(
    user.profile.bio || null, [
      Validators.minLength(50),
      Validators.maxLength(300)
    ]
  ),
  twitter: new FormControl<string>(
    user.profile.twitter || null,
    [Validators.pattern(URL_PATTERN)]
  ),
  github: new FormControl<string>(
    user.profile.github || null,
    [Validators.pattern(URL_PATTERN)]
  ),
  portfolio: new FormControl<string>(
    user.profile.portfolio || null,
    [Validators.pattern(URL_PATTERN)]
  )
});

export const CREATE_DRAFT_FORM = () => new FormGroup<CreateDraftForm>({
  title: new FormControl<string>(null, [
    Validators.required,
    Validators.minLength(10)
   ]),
   category: new FormControl<PostCategory>(null, [Validators.required]),
   cover: new FormControl<string>(null, [
    Validators.required,
    Validators.pattern(IMAGE_PATTERN)
  ]),
  intro: new FormControl<string>(null, [
    Validators.required,
    Validators.minLength(150),
    Validators.maxLength(500)
  ]),
});