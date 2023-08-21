import {saveAs} from 'file-saver'

interface Data {
  [key: string]: any;
}

export async function downloadJsonData(data: Data, fileName: string): Promise<void> {
  const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json;charset=utf-8',
  })

  // 保存文件到本地
  saveAs(jsonBlob, `${fileName}.json`)
}
