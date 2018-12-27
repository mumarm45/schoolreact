/**
 * Created by mumarm45 on 18/12/2018.
 */

import logger from "./logger";
import thunk from "redux-thunk";
import {applyMiddleware} from "redux";

export  default applyMiddleware(thunk, logger);