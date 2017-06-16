$(function () {
    let url = new URL(window.location.href)
    let videoPath = decodeURIComponent(url.searchParams.get('video'))
    console.log(videoPath)

    $('#video').attr('src', videoPath)
})