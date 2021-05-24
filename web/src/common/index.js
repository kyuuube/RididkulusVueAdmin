export const downFile = (blob, fileName) => {
    // 非IE下载
    if ('download' in document.createElement('a')) {
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob); // 创建下载的链接
        link.download = fileName; // 下载后文件名
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click(); // 点击下载
        window.URL.revokeObjectURL(link.href); // 释放掉blob对象
        document.body.removeChild(link); // 下载完成移除元素
    } else {
        // IE10+下载
        window.navigator.msSaveBlob(blob, fileName);
    }
};

export const loadScript = src => {
    let script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.append(script);
};
