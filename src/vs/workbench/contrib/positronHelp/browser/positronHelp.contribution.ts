/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Posit, PBC.
 *--------------------------------------------------------------------------------------------*/

import * as nls from 'vs/nls';
import { Codicon } from 'vs/base/common/codicons';
import { Disposable } from 'vs/base/common/lifecycle';
import { KeyMod, KeyCode } from 'vs/base/common/keyCodes';
import { Registry } from 'vs/platform/registry/common/platform';
import { registerIcon } from 'vs/platform/theme/common/iconRegistry';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { LifecyclePhase } from 'vs/workbench/services/lifecycle/common/lifecycle';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { ViewPaneContainer } from 'vs/workbench/browser/parts/views/viewPaneContainer';
import { PositronHelpViewPane } from 'vs/workbench/contrib/positronHelp/browser/positronHelpView';
import { InstantiationType, registerSingleton } from 'vs/platform/instantiation/common/extensions';
import { PositronHelpService } from 'vs/workbench/contrib/positronHelp/browser/positronHelpService';
import { IPositronHelpService, POSITRON_HELP_VIEW_ID } from 'vs/workbench/services/positronHelp/common/positronHelp';
import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions, IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { ViewContainer, IViewContainersRegistry, ViewContainerLocation, Extensions as ViewContainerExtensions, IViewsRegistry } from 'vs/workbench/common/views';

// Register Service
registerSingleton(IPositronHelpService, PositronHelpService, InstantiationType.Delayed);

// register output container
const positronHelpViewIcon = registerIcon('positron-help-view-icon', Codicon.positronHelp, nls.localize('positronHelpViewIcon', 'View icon of the Positron help view.'));
const VIEW_CONTAINER: ViewContainer = Registry.as<IViewContainersRegistry>(ViewContainerExtensions.ViewContainersRegistry).registerViewContainer({
	id: POSITRON_HELP_VIEW_ID,
	title: nls.localize('help', "Help"),
	icon: positronHelpViewIcon,
	order: 1,
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [POSITRON_HELP_VIEW_ID, { mergeViewWithContainerWhenSingleView: true }]),
	storageId: POSITRON_HELP_VIEW_ID,
	hideIfEmpty: true,
}, ViewContainerLocation.Panel, { doNotRegisterOpenCommand: true });

Registry.as<IViewsRegistry>(ViewContainerExtensions.ViewsRegistry).registerViews([{
	id: POSITRON_HELP_VIEW_ID,
	name: nls.localize('help', "Help"),
	containerIcon: positronHelpViewIcon,
	canMoveView: true,
	canToggleVisibility: false,
	ctorDescriptor: new SyncDescriptor(PositronHelpViewPane),
	openCommandActionDescriptor: {
		id: 'workbench.action.positron.toggleHelp',
		mnemonicTitle: nls.localize({ key: 'miToggleHelp', comment: ['&& denotes a mnemonic'] }, "&&Help"),
		keybindings: {
			primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyH,
		},
		order: 1,
	}
}], VIEW_CONTAINER);

class PositronHelpContribution extends Disposable implements IWorkbenchContribution {
	constructor(
		@IInstantiationService instantiationService: IInstantiationService,
		@IPositronHelpService private readonly positronHelpService: IPositronHelpService,
	) {
		super();
		this.registerActions();

		// Temp.
		console.log(this.positronHelpService);
	}

	private registerActions(): void {
	}
}

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench).registerWorkbenchContribution(PositronHelpContribution, LifecyclePhase.Restored);
