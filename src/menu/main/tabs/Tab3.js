import React from 'react';
import Search from '../../../component/Search'
import Contents from '../../../component/Contents'
import Chart from 'react-google-charts'
import { JButton, JCard, JDate, JDefault, JDropDown, JLabel, JMenu, JTextField } from '../../../component/condition'
import DataTable, { defaultThemes } from 'react-data-table-component'

export default class extends React.Component {
    util = this.props.util

    state = {
        searchDt: {
            from: this.util.baseDate.yearFirstDay,
            to: this.util.baseDate.yearLastDay,
        },
        groupFg: '0',
        baseDt: this.util.baseDate.today,

        data: {
            totalGrid: [],
            categoryLGrid: [],
            categoryMGrid: [],
            categorySGrid: [],
            categoryLChart: [],
            categoryMChart: [],
            categorySChart: [],
        }
    }

    getData = {
        totalGrid: async () => {
            try {
                let res = await this.util.callApi.get('/manday/selectRank', {
                    dt_start: this.state.searchDt.from,
                    dt_end: this.state.searchDt.to,
                    dt_base: this.state.baseDt,
                    group_fg: this.state.groupFg
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        totalGrid: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        categoryLGrid: async () => {
            try {
                let res = await this.util.callApi.get('/manday/selectRankLMS', {
                    dt_start: this.state.searchDt.from,
                    dt_end: this.state.searchDt.to,
                    dt_base: this.state.baseDt,
                    group_fg: this.state.groupFg,
                    lms_fg: 'L'
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        categoryLGrid: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        categoryMGrid: async () => {
            try {
                let res = await this.util.callApi.get('/manday/selectRankLMS', {
                    dt_start: this.state.searchDt.from,
                    dt_end: this.state.searchDt.to,
                    dt_base: this.state.baseDt,
                    group_fg: this.state.groupFg,
                    lms_fg: 'M'
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        categoryMGrid: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        categorySGrid: async () => {
            try {
                let res = await this.util.callApi.get('/manday/selectRankLMS', {
                    dt_start: this.state.searchDt.from,
                    dt_end: this.state.searchDt.to,
                    dt_base: this.state.baseDt,
                    group_fg: this.state.groupFg,
                    lms_fg: 'S'
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        categorySGrid: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        categoryLChart: async () => {
            try {
                let res = await this.util.callApi.get('/manday/selectRankLMSChart', {
                    dt_start: this.state.searchDt.from,
                    dt_end: this.state.searchDt.to,
                    dt_base: this.state.baseDt,
                    group_fg: this.state.groupFg,
                    lms_fg: 'L'
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        categoryLChart: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        categoryMChart: async () => {
            try {
                let res = await this.util.callApi.get('/manday/selectRankLMSChart', {
                    dt_start: this.state.searchDt.from,
                    dt_end: this.state.searchDt.to,
                    dt_base: this.state.baseDt,
                    group_fg: this.state.groupFg,
                    lms_fg: 'M'
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        categoryMChart: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
        categorySChart: async () => {
            try {
                let res = await this.util.callApi.get('/manday/selectRankLMSChart', {
                    dt_start: this.state.searchDt.from,
                    dt_end: this.state.searchDt.to,
                    dt_base: this.state.baseDt,
                    group_fg: this.state.groupFg,
                    lms_fg: 'S'
                })
                this.setState({
                    data: {
                        ...this.state.data,
                        categorySChart: res.data
                    }
                })
            } catch (err) {
                console.log('##### ERROR #####')
                console.error(err)
            }
        },
    }


    componentDidMount = () => {
        this.getData.totalGrid()
        this.getData.categoryLGrid()
        this.getData.categoryMGrid()
        this.getData.categorySGrid()
        this.getData.categoryLChart()
        this.getData.categoryMChart()
        this.getData.categorySChart()
    }

    render = () => {
        return (
            <>
                <Search
                    onConfirm={(e) => {
                        console.log('this.state => ', this.state)
                        console.log('this.props => ', this.props)
                    }}>
                    <JDate
                        label='????????????'
                        type='period'
                        value={this.state.searchDt}
                        onChange={(e) => {
                            this.setState({ searchDt: e.value })
                        }} />
                    <JDate
                        label='????????????'
                        type='single'
                        value={this.state.baseDt}
                        onChange={(e) => {
                            this.setState({ baseDt: e.value })
                        }} />
                    <JButton label='??????' onClick={() => {
                        console.log('??????')
                        this.setState({
                            searchDt: { from: this.props.util.baseDate.yearFirstDay, to: this.props.util.baseDate.yearLastDay },
                            baseDt: this.props.util.baseDate.today
                        })
                    }} />
                    <JButton label='1??????' onClick={() => {
                        console.log('1??????')
                        this.setState({ searchDt: this.props.util.baseDate.quarter1 })
                    }} />
                    <JButton label='2??????' onClick={() => {
                        console.log('2??????')
                        this.setState({ searchDt: this.props.util.baseDate.quarter2 })
                    }} />
                    <JButton label='3??????' onClick={() => {
                        console.log('3??????')
                        this.setState({ searchDt: this.props.util.baseDate.quarter3 })
                    }} />
                    <JButton label='4??????' onClick={() => {
                        console.log('4??????')
                        this.setState({ searchDt: this.props.util.baseDate.quarter4 })
                    }} />
                </Search>
                <Contents >
                    <JCard x={'1/12'} y={'1/2'} title={'??????'} >
                        <DataTable
                            noHeader
                            columns={[
                                { name: '??????', selector: 'RANK', sortable: false, center: true },
                                { name: '?????????', selector: 'CATEGORY_L', sortable: false, grow: 2 },
                                { name: '?????????', selector: 'CATEGORY_M', sortable: false, grow: 2 },
                                { name: '?????????', selector: 'CATEGORY_S', sortable: false, grow: 2 },
                                { name: '??? ??????(???)', selector: 'CNT', sortable: false, right: true },
                                { name: '??? ??????(??????)', selector: 'TIME_SUM', sortable: false, right: true },
                                { name: '????????????(M/D)', selector: 'MD', sortable: false, right: true },
                            ]}
                            data={this.state.data.totalGrid}
                        />
                    </JCard>
                    <JCard x={'1/6'} y={'3/3'} title={'?????????'} >
                        <DataTable
                            noHeader
                            columns={[
                                { name: '?????????', selector: 'CATEGORY', sortable: false, grow: 2 },
                                { name: '??? ??????(???)', selector: 'CNT', sortable: false, right: true },
                                { name: '??? ??????(??????)', selector: 'TIME_SUM', sortable: false, right: true },
                                { name: '????????????(M/D)', selector: 'MD', sortable: false, right: true },
                            ]}
                            data={this.state.data.categoryLGrid}
                        />
                    </JCard>
                    <JCard x={'7/6'} y={'3/3'} title={'?????????'} >
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.categoryLChart}
                            options={{
                                chartArea: {
                                    width: '70%',
                                    height: '80%'
                                },
                                legend: { position: 'none' }
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </JCard>
                    <JCard x={'1/6'} y={'6/3'} title={'?????????'} >
                        <DataTable
                            noHeader
                            columns={[
                                { name: '?????????', selector: 'CATEGORY', sortable: false, grow: 2 },
                                { name: '??? ??????(???)', selector: 'CNT', sortable: false, right: true },
                                { name: '??? ??????(??????)', selector: 'TIME_SUM', sortable: false, right: true },
                                { name: '????????????(M/D)', selector: 'MD', sortable: false, right: true },
                            ]}
                            data={this.state.data.categoryMGrid}
                        />
                    </JCard>
                    <JCard x={'7/6'} y={'6/3'} title={'?????????'} >
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.categoryMChart}
                            options={{
                                chartArea: {
                                    width: '70%',
                                    height: '80%'
                                },
                                legend: { position: 'none' }
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </JCard>
                    <JCard x={'1/6'} y={'9/3'} title={'?????????'} >
                        <DataTable
                            noHeader
                            columns={[
                                { name: '?????????', selector: 'CATEGORY', sortable: false, grow: 2 },
                                { name: '??? ??????(???)', selector: 'CNT', sortable: false, right: true },
                                { name: '??? ??????(??????)', selector: 'TIME_SUM', sortable: false, right: true },
                                { name: '????????????(M/D)', selector: 'MD', sortable: false, right: true },
                            ]}
                            data={this.state.data.categorySGrid}
                        />
                    </JCard>
                    <JCard x={'7/6'} y={'9/3'} title={'?????????'} >
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.data.categorySChart}
                            options={{
                                chartArea: {
                                    width: '70%',
                                    height: '80%'
                                },
                                legend: { position: 'none' }
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </JCard>
                </Contents>
            </>
        )
    }
}