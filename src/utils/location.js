export function getlocation(callback){

const Client = require('aliyun-api-gateway').Client;
const UUID = require('uuid');

// 用appKey和appSecret初始化客户端

const client = new Client('33541419', 'f2cb71bf2b1741459ba50bd0d36e2562');

const Gateway = async ({url, apiVer, params, iotToken}) => {

    return await client.post(url, {
        data: {
            id: UUID.v1(), // 请求唯一标识，必填
            version: '1.0', // 协议版本，固定值1.0
            request: {
                iotToken, // iottoken，选填
                apiVer // api版本，必填
            },
            params: params || {} // 业务参数，必填
        },
        headers: {
            accept: 'application/json'
        },
        timeout: 3000        
    });

};

const params = {
    url: 'http://fcaea944ce554e968c4dc6acdd53033b-cn-shanghai.alicloudapi.com/a123spAe9pmMS0F4/bfC2h9KdtEhecu',
    apiVer: '1.0.0',
    params: {
        // 接口参数
        
		"action":"node_fee4b250",
    }
}

Gateway(params)
    .then(res => {console.log(res);
    callback(res);})
    .catch(res => console.log(res));

}