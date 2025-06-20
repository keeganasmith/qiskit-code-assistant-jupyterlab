/*
 * Copyright 2024 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getModels } from './api';
import { StatusBarWidget } from '../StatusBarWidget';
import { IModelInfo } from '../utils/schema';
const myModelInfo: IModelInfo = {
  _id: "model-001",
  delimiting_tokens: {
    start_token: "<|start|>",
    middle_token: "<|middle|>",
    end_token: "<|end|>",
  },
  disclaimer: {
    accepted: true,
  },
  display_name: "My Awesome Model",
  doc_link: "https://example.com/my-awesome-model-docs",
  endpoints: {
    generation_endpoint: "https://api.example.com/v1/generate",
    moderation_endpoint: "https://api.example.com/v1/moderate",
  },
  license: {
    name: "MIT",
    link: "https://opensource.org/licenses/MIT",
  },
  model_id: "awesome-model-v1",
  moderations: {
    hap: 0.1,
    social_bias: 0.05,
  },
  parameters: {
    temperature: 0.8,
    max_new_tokens: 150,
  },
  prompt_type: 2,
  token_limit: 2048,
};
let modelsList: IModelInfo[] = [myModelInfo];
let currentModel: IModelInfo | undefined = undefined;

export function getModelsList(): IModelInfo[] {
  console.log("got here, models list is: ", modelsList)
  return modelsList;
}

export function getCurrentModel(): IModelInfo | undefined {
  return currentModel;
}

export function setCurrentModel(model?: IModelInfo): void {
  currentModel = modelsList.find(m => m._id === model?._id);
  StatusBarWidget.widget?.refreshStatusBar();
}

export async function refreshModelsList(): Promise<void> {
  return await getModels()
    .then(models => {
      modelsList = models;
      currentModel =
        modelsList.find(m => m._id === currentModel?._id) || models?.[0];
      StatusBarWidget.widget?.refreshStatusBar();
    })
    .catch(reason => {
      throw new Error(reason);
    });
}
