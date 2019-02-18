import { Component } from '@angular/core';
import { AppareilsPage } from '../appareils/appareils';
import { SettingsPage } from '../settings/settings';
import { OptionsPage } from '../options/options';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  appareilsPage = AppareilsPage;
  optionsPage = OptionsPage;

  settingsPage = SettingsPage;
}