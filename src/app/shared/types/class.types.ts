import { DraftSideBarSettings } from "./interface.user";
import { DraftSidebarSettingsEnum, ErrorsTypeEnum, ThemeEnum, ThemeType } from "./types.enums";

export class MasonryType {
    public layout!: () => void;
    public appended!: (els: Element[]) => void;
    public prepended!: (els: Element[]) => void;
    public remove!: (els: Element[]) => void;
}

export class UserProfile {
  constructor(
    public role: string = '',
    public bio: string = 'Escribe algo sobre ti',
    public twitter: string = '',
    public github: string = '',
    public portfolio: string = '',
    public location: string = ''
  ) { }
}

export class UserSettings {
  constructor(
    public theme: ThemeType = ThemeEnum.LIGHT,
    public autoLogin: boolean = true,
    public refreshToken: boolean = true,
    public rememberEmail: boolean = true,
    public autoSave: boolean = true,
    public draftSidebar: DraftSideBarSettings = { 
      fixed: false, 
      state: DraftSidebarSettingsEnum.EXPANDED
    }
  ) { }
}

export class CustomError {
  name: string;
  message: string;
  status?: number;
  text: string;
  url?: string;
  author?: string;
  date?: string;
  type: ErrorsTypeEnum;

  constructor(name: string,
              type: ErrorsTypeEnum,
              message: string = 'Error',
              text: string = 'Error',
              author: string,
              status: number = null,
              url: string = '',) {
    this.name = name;
    this.type = type;
    this.message = message;
    this.status = status;
    this.text = text;
    this.url = url;
    this.author = author;
  }
}