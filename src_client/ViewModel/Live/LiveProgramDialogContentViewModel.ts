"use strict";

import ViewModel from '../ViewModel';
import { LiveConfigApiModelInterface } from '../../Model/Api/Live/LiveConfigApiModel';
import { LiveStartWatchApiModelInterface } from '../../Model/Api/Live/Watch/LiveStartWatchApiModel';
import { EPGSingleUpdateEpgrecModuleModelInterface } from '../../Model/Api/EpgrecModule/EPGSingleUpdateEpgrecModuleModel';

/**
* LiveConfig の ViewModel
*/
class LiveProgramDialogContentViewModel extends ViewModel {
    private liveConfigApiModel: LiveConfigApiModelInterface;
    private liveStartWatchApiModel: LiveStartWatchApiModelInterface;
    private epgSingleUpdateEpgrecModuleModel: EPGSingleUpdateEpgrecModuleModelInterface;
    private title: string = "";
    private sid: string;
    private channel: string;
    private channelDisk: string | null = null;
    public enableNewStream: boolean = false; //新規ストリームチェックボックス

    constructor(
        _liveConfigApiModel: LiveConfigApiModelInterface,
        _liveStartWatchApiModel :LiveStartWatchApiModelInterface,
        _epgSingleUpdateEpgrecModuleModel: EPGSingleUpdateEpgrecModuleModelInterface
    ) {
        super();

        this.liveConfigApiModel = _liveConfigApiModel;
        this.liveStartWatchApiModel = _liveStartWatchApiModel;
        this.epgSingleUpdateEpgrecModuleModel = _epgSingleUpdateEpgrecModuleModel;
    }

    /**
    * setup
    * @param title ダイアログタイトル
    * @param type 放送波
    * @param channel channel
    * @param sid sid
    * @param chanelDisk channelDisk
    */
    public setup(title: string, type: string, channel: string, sid: string, channelDisk: string | null = null): void {
        this.title = title;
        this.channel = channel;
        this.sid = sid;
        this.liveConfigApiModel.setup(type);
        this.channelDisk = channelDisk;
        this.enableNewStream = false;
    }

    /**
    * tuner, video List を取得
    */
    public configListUpdate(): void {
        this.liveConfigApiModel.update();
    }

    /**
    * tuner List を返す
    * @param streamNumber stream number
    */
    public getTunerList(streamNumber: number | null): any[] {
        let tunerList: any[] = [];

        this.liveConfigApiModel.getTunerList().map((data: { [key: string]: any }) => {
            // /live /program で開かれた時
            if(streamNumber == null) {
                if(data["streamId"] == -1) { tunerList.push(data); }
            } else { // /live/watch で開かれた時
                if(data["streamId"] == streamNumber && !this.enableNewStream) {
                    data["name"] = "このストリーム";
                    tunerList.unshift(data);
                } else if(data["streamId"] == -1){
                    tunerList.push(data);
                }
            }
        });

        return tunerList;
    }

    /**
    * video List を返す
    */
    public getVideoList(): any[] {
        return this.liveConfigApiModel.getVideoList();
    }

    // title を返す
    public getTitle(): string {
        return this.title;
    }

    // channelDisk を返す
    public getChannelDisk(): string | null {
        return this.channelDisk;
    }

    /**
    * stream を開始する
    * @param tunerId tunerId
    * @param videoId videoId
    */
    public startStream(tuner: number, video: number): void {
        this.liveStartWatchApiModel.update (
            this.channel,
            this.sid,
            tuner,
            video
        );
    }

    /**
    * 指定した stream のチャンネル変更をする
    * @param tuner tuner
    * @param video video
    * @param stream stream number
    */
    public changeStream(tuner: number, video: number, stream: number): void {
        this.liveStartWatchApiModel.update (
            this.channel,
            this.sid,
            tuner,
            video,
            stream
        );
    }

    /**
    * EPG を更新する
    */
    public epgUpdate(): void {
        if(this.channelDisk == null) { return; }
        this.epgSingleUpdateEpgrecModuleModel.execute(this.channelDisk);
    }
}

export default LiveProgramDialogContentViewModel;

