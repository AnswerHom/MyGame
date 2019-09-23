module dou.gui.component {
    /**
     * 特殊展示列表，一般由三个组件组成
     * 滑动到中间的组件会变大
     */
    export class MyList extends Laya.Panel {
        //类型枚举
        static TYPE_HORIZONTAL: number = 0;//水平
        static TYPE_VERTICAL: number = 1;//垂直
        //滑动类型
        static TYPE_ADD: number = 0;
        static TYPE_DEC: number = 1;

        //最大显示数量
        static MAX_COUNT: number = 3;
        //最大缩放
        static MAX_SCALE: number = 1.2;
        //最小缩放
        static MIN_SCALE: number = 1;
        //滚动时间
        static SCROLL_TIME: number = 200;

        //类型
        private _type: number;
        //间隔
        private _space: number;
        //是否循环列表
        private _isLoop: boolean = false;
        //位置数组
        private _posArray: number[];
        //组件宽度
        private _itemWidth: number;
        //组件高度
        private _itemHeight: number;
        //是否正在滚动中
        private _isPlaying: boolean = false;
        //第一次点击的X
        private _firstX: number;

        private _selectHandler:Handler;
        //数据源
        private _dataArray: any[];
        set array(value: any[]) {
            this._dataArray = value;
            this.updateData();
        }
        get array(){
            return this._dataArray;
        }
        //渲染组件
        private _renderItem: any;
        //当前选中
        private _selectIndex: number = 0;
        set selectIndex(value: number) {
            this._selectIndex = value;
            this.updateData();
        }
        get selectIndex(): number {
            return this._selectIndex;
        }

        selectHandler(handler:Handler):void{
            this._selectHandler = handler;
        }
        //渲染组件集合
        private _renderItemList: any[];

        /**
         * 构造函数
         * @param type 列表类型(垂直或者水平)
         * @param renderItem 渲染组件
         * @param space 间隔
         * @param isLoop 是否循环列表
         */
        constructor(type: number, renderItem: any, space: number, isLoop: boolean = false) {
            super();
            this._renderItemList = [];
            this._posArray = [];
            this._type = type;
            this._renderItem = renderItem;
            this._space = space;
            this._isLoop = isLoop;
            this.initPanel();
            //滑动监听事件
            this.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
            this.on(LEvent.MOUSE_UP, this, this.onMouseUp);
        }

        private onMouseDown(e: LEvent): void {
            this._firstX = e.stageX;
        }

        private onMouseUp(e: LEvent): void {
            let lastX = e.stageX;
            //有效滑动距离为5 进入滑动事件
            let offset = lastX - this._firstX;
            if (Math.abs(offset) > 5) {
                if (offset > 0) {
                    this.scroll(MyList.TYPE_DEC);
                } else {
                    this.scroll(MyList.TYPE_ADD);
                }
            }
        }


        private initPanel(): void {
            if (!this._renderItem) return;
            this._isPlaying = false;
            //清理渲染组件集合
            for (let renderItem of this._renderItemList) {
                if (renderItem.destroy)
                    renderItem.destroy();
            }
            this._renderItemList.length = 0;
            let def = this._renderItem;
            //需要初始化组件的个数
            for (let i = 0; i < MyList.MAX_COUNT + 1; i++) {
                let item = new def();
                item.anchorX = item.anchorY = 0.5;
                this._renderItemList.push({ render: item, posIndex: -1 });
                if (!this._itemWidth || !this._itemHeight) {
                    this._itemWidth = item.width;
                    this._itemHeight = item.height;
                }
            }
            //初始化位置
            this._posArray.length = 0;
            if (this._type == MyList.TYPE_HORIZONTAL) {
                //水平
                let posX: number = -this._itemWidth / 2 - this._space;
                //计算出5个位置 3个显示未知 2个是等待区位置
                for (let i = 0; i < MyList.MAX_COUNT + 2; i++) {
                    this._posArray.push(posX);
                    posX += this._itemWidth + this._space;
                }
                this.size(MyList.MAX_COUNT * this._itemWidth + (MyList.MAX_COUNT - 1) * this._space, this._itemHeight * MyList.MAX_SCALE);
            } else {
                //垂直
                let posY: number = -this._itemHeight / 2 - this._space;
                //计算出5个位置 3个显示未知 2个是等待区位置
                for (let i = 0; i < MyList.MAX_COUNT + 2; i++) {
                    this._posArray.push(posY);
                    posY += this._itemHeight + this._space;
                }
                this.size(this._itemWidth * MyList.MAX_SCALE, MyList.MAX_COUNT * this._itemHeight + (MyList.MAX_COUNT - 1) * this._space);
            }
        }

        //用于更新数据
        private updateData(): void {
            this.clearShow();
            if (!this._dataArray || this._dataArray.length < 0) return;
            let dataIndex = this._selectIndex - 1;
            let posIndex = this._selectIndex == 0 ? 2 : 1;
            let itemIndex = 0;

            for (let i = 0; i < MyList.MAX_COUNT; i++) {
                if (dataIndex + i < 0) continue;
                //添加组件
                let renderItem = this.addItem(dataIndex + i, posIndex++);
                if (dataIndex + i == this._selectIndex) {
                    renderItem.scale(MyList.MAX_SCALE, MyList.MAX_SCALE);
                } else {
                    renderItem.scale(MyList.MIN_SCALE, MyList.MIN_SCALE);
                }
            }
        }

        /**
         * 滑动主方法
         * @param type 滑动类型
         * @param endCallBack 滑动结束回调
         */
        scroll(type: number, endCallBack?: Function): void {
            if (this._isPlaying) return;
            if (type == MyList.TYPE_ADD) {
                if (!this._isLoop && this._selectIndex + 1 > this._dataArray.length - 1) return;
                this._selectIndex++;
                if (this._isLoop) {
                    this._selectIndex = this._selectIndex > this._dataArray.length - 1 ? 0 : this._selectIndex;
                    //添加补位组件
                    let nextIndex = this._selectIndex + 1;
                    nextIndex = nextIndex > this._dataArray.length - 1 ? 0 : nextIndex;
                    this.addItem(nextIndex, this._posArray.length - 1);
                } else if (this._selectIndex + 1 <= this._dataArray.length - 1) {
                    let nextIndex = this._selectIndex + 1;
                    this.addItem(nextIndex, this._posArray.length - 1);
                }
            } else {
                if (!this._isLoop && this._selectIndex - 1 < 0) return;
                this._selectIndex--;
                if (this._isLoop) {
                    this._selectIndex = this._selectIndex < 0 ? this._dataArray.length - 1 : this._selectIndex;
                    //添加补位组件
                    let nextIndex = this._selectIndex - 1;
                    nextIndex = nextIndex < 0 ? this._dataArray.length - 1 : nextIndex;
                    this.addItem(nextIndex, 0);
                } else if (this._selectIndex - 1 >= 0) {
                    let nextIndex = this._selectIndex - 1;
                    this.addItem(nextIndex, 0);
                }
            }
            //开始播放动画
            this._isPlaying = true;
            for (let i = 0; i < this._renderItemList.length; i++) {
                let item = this._renderItemList[i];
                let renderItem = item.render;
                if (renderItem.parent) {
                    let posIndex = item.posIndex + (type == MyList.TYPE_ADD ? -1 : 1);
                    let pos = this._posArray[posIndex];
                    item.posIndex = posIndex;
                    let scale = posIndex == 2 ? MyList.MAX_SCALE : MyList.MIN_SCALE;
                    //缓动属性
                    let props;
                    if (this._type == MyList.TYPE_HORIZONTAL) {
                        props = { x: pos, scaleX: scale, scaleY: scale };
                    } else {
                        props = { y: pos, scaleX: scale, scaleY: scale };
                    }
                    //缓动
                    Laya.Tween.to(renderItem, props, MyList.SCROLL_TIME, null, Handler.create(this, () => {
                        if (endCallBack)
                            endCallBack();
                        this.onScrollEnd(type);
                    }, null, false));
                }
            }
            this._selectHandler.run();
        }

        private _diff: number;

        /**
         * 滑动到某个索引(目前只支持滑动一次)
         * @param posIndex 位置索引
         */
        scrollTo(posIndex: number): void {
            // 2 是因为2是中间位置
            let diff = posIndex - 2;
            this._diff = Math.abs(diff);
            if (diff > 0) {
                //向左
                this.scroll(MyList.TYPE_ADD);
            } else if (diff < 0) {
                //向右
                this.scroll(MyList.TYPE_DEC);
            } else {
                //点击当前
                let item = this.getItemByIndex(2);
                let render = item.render;
                //点击事件 这个地方要注意！！！！！！点击事件由这里发起
                if (render.onClick) {
                    render.onClick();
                }
            }
        }

        /**
         * 增加组件
         * @param dataIndex 数据索引
         * @param posIndex 位置索引
         */
        private addItem(dataIndex: number, posIndex: number): any {
            let item = this.getFreeItem();
            if (!item) return;
            let renderItem = item.render;
            this.addChild(renderItem);
            //添加点击事件
            renderItem.on(LEvent.CLICK, this, this.onRenderItemClick);
            //数据
            if (renderItem.hasOwnProperty('dataSource'))
                renderItem.dataSource = this._dataArray[dataIndex];
            item.posIndex = posIndex;
            if (this._type == MyList.TYPE_HORIZONTAL) {
                renderItem.pos(this._posArray[posIndex], this._height / 2);
            } else {
                renderItem.pos(this._width / 2, this._posArray[posIndex]);
            }
            return renderItem;
        }

        private onRenderItemClick(e: LEvent): void {
            if (e.currentTarget) {
                let posIndex: number;
                let target: any = e.currentTarget;
                for (let item of this._renderItemList) {
                    if (item.render == target) {
                        posIndex = item.posIndex;
                        break;
                    }
                }
                this.scrollTo(posIndex);
            }
        }

        private onScrollEnd(type: number): void {
            this._isPlaying = false;
            if (type == MyList.TYPE_ADD) {
                let item = this.getItemByIndex(0);
                if (!item) return;
                let itemRender = item.render;
                if (itemRender.parent) {
                    itemRender.removeSelf();
                    item.posIndex = -1;
                }
            } else {
                let item = this.getItemByIndex(MyList.MAX_COUNT + 1);
                if (!item) return;
                let itemRender = item.render;
                if (itemRender.parent) {
                    itemRender.removeSelf();
                    item.posIndex = -1;
                }
            }
        }

        //通过位置索引获取对象
        getItemByIndex(index: number): any {
            for (let renderItem of this._renderItemList) {
                if (renderItem.posIndex == index)
                    return renderItem;
            }
            return null;
        }

        //获得补位的组件
        private getFreeItem(): any {
            for (let renderItem of this._renderItemList) {
                if (!renderItem.render.parent)
                    return renderItem;
            }
            return null;
        }

        private clearShow(): void {
            for (let renderItem of this._renderItemList) {
                renderItem.render.removeSelf();
                renderItem.posIndex = -1;
            }
        }

        destroy(): void {
            this.off(LEvent.MOUSE_DOWN, this, this.onMouseDown);
            this.off(LEvent.MOUSE_UP, this, this.onMouseUp);

            for (let renderItem of this._renderItemList) {
                if (renderItem.destroy)
                    renderItem.destroy();
            }
            this._renderItemList = null;
            this._dataArray = null;
            this._posArray = null;
            this._selectHandler = null;
            super.destroy(true);
        }
    }
}