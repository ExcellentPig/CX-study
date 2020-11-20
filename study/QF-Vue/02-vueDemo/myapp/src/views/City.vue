<template>
  <div>
    <mt-index-list ref="mylist">
      <mt-index-section v-for="data in datalist" :index="data.index" :key="data.index">
        <mt-cell v-for="city in data.list" :title="city.name" :key="city.cityId" @click.native="handleClick(city.cityId)"></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
export default {
  name: 'City',
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    // console.log(this.$refs.mylist.$el)
    this.$refs.mylist.$el.style.height = document.documentElement.clientHeight - 50 + 'px'
    this.$axios({
      url: 'https://m.maizuo.com/gateway?k=8365661',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1605606198523255865671681"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res)
      this.datalist = this.handleCity(res.data.data.cities)
    })
  },
  methods: {
    handleCity (datalist) {
      // console.log(datalist)
      var letterArr = []
      for (let i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      // console.log(letterArr)
      var newList = []
      for (var j = 0; j < letterArr.length; j++) {
        var arr = datalist.filter(item => item.pinyin.substring(0, 1) === letterArr[j].toLowerCase())
        // console.log(arr)
        if (arr.length > 0) {
          newList.push({
            index: letterArr[j],
            list: arr
          })
        }
      }
      // console.log(newList)
      return newList
    },
    handleClick (id) {
      // console.log(id)
      localStorage.setItem('cityId', id)
      this.$router.push('/cinema')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
