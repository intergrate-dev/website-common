$(function(){
    new Vue({
        el: '#web'
    })

    Vue.component('my-banner', {
        template: '#my-banner',
        data() {
            return {
                banners: [],
                swiper: null
            }
        },
        methods: {
            getBanners() {
                this.$http.get('../../data/index.json').then(res => {
                    this.banners = res.body.bannerList
                    Vue.nextTick(() => {
                        //在这里，banners改变后所引起的swiper-slide重新循环渲染已经结束了，页面中已经有了多个图片了
                        this.swiper = new Swiper('.swiper-container', {
                            spaceBetween: 30,
                            centeredSlides: true,
                            autoplay: {
                                delay: 2500,
                                disableOnInteraction: false,
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        });
                    })

                })
            }
        },
        created() {
            this.getBanners()
        },
        mounted() {

        },
        beforeUpdate() {

        },
        updated() {

        },
        watch: {
            /*banners() {
                setTimeout(() => {
                    new Swiper('.banner',{
                        pagination:{el:'.swiper-pagination'}
                    })
                }, 3000);
            }*/
        },
        beforeDestroy() {
            delete this.swiper
        }
    })

});

