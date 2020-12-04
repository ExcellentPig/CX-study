<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
// 工具类 转换拼音 和找到对应文件
import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
  name: 'Map',
  data () {
    return {
      chartInstance: null,
      allData: null,
      mapData: {} // 所获取的省份地图矢量数据的缓存
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  unmounted () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, 'chalk')
      // 获取地图矢量数据
      // http://localhost:8999/static/map/china.json 静态获取数据
      // axios $http 已经配置baseURL 所以不能使用
      // 所以局部引入axios
      const ret = await axios.get('http://localhost:8999/static/map/china.json')
      // console.log(ret)
      // 注册
      this.$echarts.registerMap('china', ret.data)
      const initOption = {
        title: {
          text: '▎商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2e72bf',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click', async (arg) => {
        // console.log('click', arg)
        const proviceInfo = getProvinceMapInfo(arg.name)
        // console.log(proviceInfo)
        // 获取这个省份的地图矢量数据
        // 缓存数据 判断省份地图数据是否存在
        if (!this.mapData[proviceInfo.key]) {
          const ret = await axios.get(`http://localhost:8999/${proviceInfo.path}`)
          this.mapData[proviceInfo.key] = ret.data
          // console.log(ret)
          this.$echarts.registerMap(proviceInfo.key, ret.data)
        }
        const changeOption = { // 切换地图
          geo: {
            map: proviceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },
    async getData () {
      const { data: ret } = await this.$http.get('map')
      this.allData = ret
      // console.log(this.allData)
      this.updateChart()
    },
    updateChart () {
      // 图例数据
      const legendArr = this.allData.map(item => {
        return item.name
      })
      // 地图散点数据
      const seriesArr = this.allData.map(item => {
        // 代表一个类别下的所有散点数据
        // 在地图中使用散点数据 需要给散点的图表增加一个配置  coordinateSystem: geo
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      // 计算合适的大小
      const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    revertMap () { // 双击回到中国地图
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    }
  }
}
</script>

<style>
</style>
