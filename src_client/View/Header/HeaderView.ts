"use strict";

import * as m from 'mithril';
import View from '../View';

/**
* Header 部分の View
* @param _title ヘッダーのタイトル名を設定する
* @throw HeaderView option Error options が正しくない場合発生
*/
class HeaderView extends View {
    private static title: string = "";
    private leftButtons: Mithril.VirtualElement[] = [];

    /**
    * @throw HeaderView option Error options が正しくない場合発生
    */
    protected checkOptions(): void {
        if(!this.typeCheck("title", "string")) {
            console.log(this.options);
            throw new Error('HeaderView option Error');
        }

        if(HeaderView.title != this.options["title"]) {
            HeaderView.title = this.options["title"];
            document.title = HeaderView.title;
        }

        if(typeof this.options["leftButton"] != "undefined") {
            this.leftButtons = this.options["leftButton"]
        }
    }

    public execute(): Mithril.VirtualElement {
        return m("header", {class: "mdl-layout__header" }, [
            m("div", { class: "mdl-layout__header-row", style: "padding-right: 8px;" }, [
                m("span", { class: "mdl-layout-title" }, HeaderView.title),

                m("div", { class: "mdl-layout-spacer" } ),
                this.leftButtons
            ])
        ]);
    }
}

export default HeaderView;

