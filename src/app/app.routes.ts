import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		title: 'Ripple Swim Co. | Confident Starts in the Water',
		loadComponent: () => import('./pages/home/home.page').then((module) => module.HomePage),
	},
	{
		path: 'about',
		title: 'About | Ripple Swim Co.',
		loadComponent: () => import('./pages/about/about.page').then((module) => module.AboutPage),
	},
	{
		path: 'classes',
		title: 'Classes | Ripple Swim Co.',
		loadComponent: () => import('./pages/classes/classes.page').then((module) => module.ClassesPage),
	},
	{
		path: 'pricing',
		title: 'Pricing | Ripple Swim Co.',
		loadComponent: () => import('./pages/pricing/pricing.page').then((module) => module.PricingPage),
	},
	{
		path: 'contact',
		title: 'Contact | Ripple Swim Co.',
		loadComponent: () => import('./pages/contact/contact.page').then((module) => module.ContactPage),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
