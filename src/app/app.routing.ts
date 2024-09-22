import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin/admin.guard';
import { SameUserGuard } from '@core/guards/same-user/same-user.guard';
import { UserGuard } from '@core/guards/user/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module')
       .then(mod => mod.HomeModule), data: { name: 'Home' }
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/create/create.module')
       .then(mod => mod.CreateModule), data: { name: 'Create' },
    canActivate: [UserGuard]
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./pages/news/news.module')
       .then(mod => mod.NewsModule), data: { name: 'News' }
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./pages/help/help.module')
       .then(mod => mod.HelpModule), data: { name: 'Help' }
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module')
       .then(mod => mod.ProfileModule), data: { name: 'Profile' }
  },
  {
    path: 'post/:slug',
    loadChildren: () =>
      import('./pages/post/post.module')
       .then(mod => mod.PostModule), data: { name: 'Post' }
  },
  {
    path: 'draft/:slug',
    canActivate: [SameUserGuard],
    loadChildren: () =>
      import('./pages/draft/draft.module')
       .then(mod => mod.DraftModule), data: { name: 'Draft' }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module')
       .then(mod => mod.AdminModule), data: { name: 'Admin' },
    canActivate: [AdminGuard]
  },
  {
    path: 'conditions',
    loadChildren: () =>
      import('./pages/conditions/conditions.module')
       .then(mod => mod.ConditionsModule), data: { name: 'Conditions' }
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module')
       .then(mod => mod.AboutModule), data: { name: 'About' }
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module')
       .then(mod => mod.SearchModule), data: { name: 'Search' }
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})

export class RoutingModule { }
