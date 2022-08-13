"use strict";

import * as http from 'http';
import * as url from 'url';
import SocketIoServer from '../../../SocketIo/SocketIoServer';
import Controller from '../../Controller';
import NormalApiView from '../../../View/Api/NormalApiView';
import NormalApiSocketIoView from '../../../View/SocketIo/Api/NormalApiSocketIoView';

class EPGSingleUpdateController extends Controller {
    public execute(parsedUrl: url.Url, _request: http.ServerRequest, response: http.ServerResponse, _postData: string): void {
        this.log.access.info("controller 'EPGSingleUpdateController' was called.");

        let querystring = require('querystring');
        let q = (parsedUrl.search === null || parsedUrl.search === undefined) ? undefined :  parsedUrl.search.substring(1);
        let model = this.modelFactory.get("EPGSingleUpdateModel");
        model.setOption({ channel_disc: querystring.parse(q).channel_disc });

        let view = new NormalApiView(response, "EPGSingleUpdateModel");
        view.setModels({ EPGSingleUpdateModel: model });

        let sockets = SocketIoServer.getInstance().getSockets();
        let socketIoView = new NormalApiSocketIoView(sockets, "EPGSingleUpdateModel", "epgSingleUpdate");
        socketIoView.setModels({ EPGSingleUpdateModel: model });

        model.addViewEvent(view);
        model.addViewEvent(socketIoView);
        model.execute();
    }
}

export default EPGSingleUpdateController;

