"use strict";

import * as m from 'mithril';
import View from '../View';
import Util from '../../Util/Util';
import RecordedMenuViewModel from '../../ViewModel/Recorded/RecordedMenuViewModel';
import MenuViewModel from '../../ViewModel/Menu/MenuViewModel';
import DialogViewModel from '../../ViewModel/Dialog/DialogViewModel';
import RecordedVideoLinkDialogViewModel from '../../ViewModel/Recorded/RecordedVideoLinkDialogViewModel';

class RecordedMenuContentView extends View {
    private viewModel: RecordedMenuViewModel;
    private menuViewModel: MenuViewModel;
    private dialog: DialogViewModel;
    private videoLinkViewModel: RecordedVideoLinkDialogViewModel;

    public execute(): Mithril.VirtualElement {
        this.viewModel = <RecordedMenuViewModel>this.getModel("RecordedMenuViewModel");
        this.menuViewModel = <MenuViewModel>this.getModel("MenuViewModel");
        this.dialog = <DialogViewModel>this.getModel("DialogViewModel");
        this.videoLinkViewModel = <RecordedVideoLinkDialogViewModel>this.getModel("RecordedVideoLinkDialogViewModel");

        return m("div", [
            //プログラム詳細
            this.createItem({
                onclick: () => {
                    this.menuViewModel.close();
                    this.dialog.open(RecordedMenuViewModel.programInfoDialogId);
                }
            }, "info", "program info"),

            //絞込
            this.searchItem(),

            //ダウンロード
            this.createItem({
                onclick: () => {
                    this.menuViewModel.close();
                    this.videoLinkViewModel.update(this.viewModel.program!["id"], true);
                    this.dialog.open(RecordedVideoLinkDialogViewModel.dialogId);
                }
            }, "file_download", "download"),

            //削除
            this.createItem({
                onclick: () => {
                    this.menuViewModel.close();
                    this.dialog.open(RecordedMenuViewModel.deleteVideoDialogId);
                }
            }, "delete", "delete")
        ]);
    }

    private createItem(option: { [key: string]: any }, iconName: string, text: string): Mithril.VirtualElement {
        option["class"] = "menu-item";

        return m("div", option, [
            m("i", { class: "menu-icon material-icons" }, iconName ),
            m("div", { class: "menu-text" }, text)
        ]);
    }

    private searchItem(): Mithril.VirtualElement[] | Mithril.VirtualElement {
        if(this.viewModel.program == null) { return m("div"); }

        let query = {};
        if(this.viewModel.program["keyword_id"] == 0) {
            query["search"] = Util.createSearchStr( this.viewModel.program["title"] );
        } else {
            query["keyword_id"] = this.viewModel.program["keyword_id"];
        }

        return [
            this.createItem({
                onclick: () => {
                    this.menuViewModel.close();
                    document.getElementById(RecordedMenuContentView.searchDummyLinkId)!.click();
                }
            }, "search", "search"),

            //dummy link
            m("a", {
                id: RecordedMenuContentView.searchDummyLinkId,
                style: "display: none;",
                href: "/recorded?" + m.buildQueryString( query ),
                config: m.route
            })
        ];
    }
}

namespace RecordedMenuContentView {
    export const searchDummyLinkId = "recorded_menu_search_dummy_link";
}

export default RecordedMenuContentView;

