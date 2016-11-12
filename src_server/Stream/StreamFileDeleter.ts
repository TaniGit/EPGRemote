"use strict";

import * as fs from 'fs';
import Base from '../Base';

/**
* StreamFileDeleter
* stream ファイルの削除を行う
* @param _streamNumber: stream number
*/
class StreamFileDeleter extends Base {
    private streamNumber: number;
    private intervalId: NodeJS.Timer;

    constructor(_streamNumber: number) {
        super();
        this.streamNumber = _streamNumber;
    }

    /**
    * 全てのファイルを削除する
    */
    public deleteAllFiles(): void {
        this.log.stream.info(`delete all ts file No. ${ this.streamNumber }`);
        this.deleteFile(0);
    }

    /**
    * ファイルの自動削除開始
    * @param ファイルの削除間隔(ミリ秒) default 10 * 1000 ms
    */
    public startDeleteTsFiles(time: number = 10 * 1000): void {
        this.log.stream.info(`start delete ts file No. ${ this.streamNumber }`);
        this.intervalId = setInterval(() => {
            this.deleteFile(20);
        }, time);
    }

    /**
    * ファイルの自動削除停止
    */
    public stopDelteTsFiles(): void {
        this.log.stream.info(`stop delete ts file No. ${this.streamNumber}`);
        clearInterval(this.intervalId);
    }

    private deleteFile(fileNum: number): void {
        let configJson = this.config.getConfig();
        let dirPath = configJson.streamFilePath;
        let files = fs.readdirSync(dirPath);

        let tsFileList: string[] = [];
        files.forEach((file) => {
            if(fileNum == 0 && file.match(".m3u8") && file.match(`stream${ this.streamNumber }`)) {
                tsFileList.push(file);
            }
            if(file.match(".ts") && file.match(`stream${ this.streamNumber }`)) {
                tsFileList.push(file);
            }
        });

        //一応ソート
        tsFileList = tsFileList.sort();

        for(let i = 0; i < tsFileList.length - fileNum; i++) {
            if(typeof tsFileList[i] != "undefined" && tsFileList[i] != ".gitkeep") {
                fs.unlink(`${ dirPath }/${ tsFileList[i] }`, () => {});
                this.log.stream.info(`deleted ${tsFileList[i]}`);
            }
        };
    }
}

export default StreamFileDeleter;

