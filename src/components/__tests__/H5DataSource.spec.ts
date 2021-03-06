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

import { H5DataSource } from "../data/H5DataSource"

test('H5DataSource.fromLatLonToH5', () => {
    const h5Coords = H5DataSource.fromLatLonToH5(-120, 33)
    expect(h5Coords).toEqual([696, 375])
})

test('H5DataSource.fromH5ToLatLon', () => {
  const lonLat = H5DataSource.fromH5ToLatLon(696, 375)
  expect(lonLat).toEqual([-120, 33])
})
  