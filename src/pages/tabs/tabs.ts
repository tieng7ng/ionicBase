import { Component } from '@angular/core';
import { SettingsPage } from '../settings/settings';
import { AppareilsPage } from '../appareils/appareils';
import { OptionsPage } from '../options/options';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  optionsPage = OptionsPage;
  appareilsPage = AppareilsPage;
  settingsPage = SettingsPage;
}