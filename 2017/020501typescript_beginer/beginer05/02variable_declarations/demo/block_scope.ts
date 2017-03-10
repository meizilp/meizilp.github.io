for (let i = 0; i < 3; ++i) {
    var j = i * 10
    setTimeout(function () {
        console.log(`i:${i} j:${j}`)
    }, 100);
}
