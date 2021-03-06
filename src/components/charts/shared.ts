/*
 * Copyright 2019 Alex Niu, Garret Fick, Jitendra Rathour, Zhimin Shen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import { Coordinate, Region } from '../geom'
import { DataSeriesDefinition } from '../data/DataSourceService'
import { GeoJsonShape } from '../data/GeoJson'

export type ChartProps = {
    target: Coordinate;
    region: Region;
    valueDomain: [number, number];
    mapWidth: number;
    mapHeight: number;
    seriesDefs: DataSeriesDefinition[];
    data: GeoJsonShape | undefined;
}


export type DataSet = {
    id: string,
    data: {},
}

export type ChartState = {
    data: DataSet[]
}
