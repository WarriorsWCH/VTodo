

//本地数据存储，存储任务数据
//存取localStorage中的数据
var store = {
    save(key, value) {
        //value --- list数组  --- 转成json形式的字符串/序列化
        localStorage.setItem(key, JSON.stringify(value));
    },
    fetch(key) {
        //解析获取的字符串成熟组
        return JSON.parse(localStorage.getItem(key)) || [];//没有数据返回空数组
    }

}

//获取本地存储的数据，依据todo-list
var list = store.fetch("todo-list");


//vue对象实例化
var app = new Vue({
    el: ".main",
    data: {
        list: list,
        todo: '',//记录用户输入的内容，最终是要把这个记录放在list中
        editorTodo: '',//记录被编辑的内容
        beforTodo: '', //记录编辑之前的数据/内容
        navStatus: 'all'//通过这个属性的变化对数据进行过滤
    },
    watch: {//监听数据的变化
        //监听list数据的变化
        //		list(){//浅度监听，只能对象本身，不能监听对象中的对象/数据
        //			store.save("todo-list",this.list);
        //		}

        list: {
            //数据变化就会触发handler方法
            handler() {
                store.save("todo-list", this.list);
            },
            deep: true//深度监听
        }
    },
    computed: {
        noCompelate() {
            //数据的过滤，获取有多少条任务未完成
            return this.list.filter(function (item) {
                //过滤出所有isChecked为false的数据
                return !item.isChecked;
            }).length
        },
        filterList() {//过滤所有情况
            var filter = {
                all(list) {//所有
                    return list;
                },
                unfinish(list) {//未完成
                    return list.filter(function (item) {
                        return !item.isChecked;
                    });
                },
                finish(list) {//已完成
                    return list.filter(function (item) {
                        return item.isChecked;
                    });
                }
            }
            //根据情况 返回相应的数据/数组
            return filter[this.hash] ? filter[this.hash](list) : list;
            //根据hash值调用filter对象中相应的方法
            //应为hash值和方法名相同
        }
    },
    methods: {
        addTodo() {//添加任务
            //把todo添加到数组中，todo ---- title
            this.list.push({
                //push方法并不是原生的push方法，vue在原生的基础上封装/改造的方法
                //调用这个push方法会更新DOM
                title: this.todo,
                isChecked: false
            });
            //清空记录的数据，保证用户下次输入可以从新开始
            this.todo = "";
        },
        deleteTodo(item) {//删除任务
            //获取要删除元素的索引
            var index = this.list.indexOf(item);
            //删除元素
            this.list.splice(index, 1);
            //splice 也不是原生的方法
            //调用这个splice方法会更新DOM
        },
        editTodo(item) {//双击编辑

            //编辑任务时，记录一下这条任务的title
            //方便后面取消编辑的时候重新赋值
            this.beforTodo = item.title;

            //记录被编辑的内容
            this.editorTodo = item;
        },
        editTodoed(item) {//编辑成功
            //让input消失
            this.editorTodo = '';
        },
        cancelTodo(item) {//取消任务
            //原来的值复原
            item.title = this.beforTodo;

            //让input消失
            this.editorTodo = '';
        }
    },
    directives: {//自定义指令
        "foucs": {
            //钩子函数
            update(el, binding) {
                //el: 指令所绑定的元素，可以用来直接操作 DOM 。
                //binding: 一个对象，包含以下属性：name  value....
                console.log(el);
                console.log(binding);

                if (binding.value) {
                    //自动聚焦
                    el.focus();
                }
            }
        }
    }
})

//哈希值得处理/变化
function watchHashChange() {
    var hash = window.location.hash.slice(1);
    //#all   all  unfinish  finnish
    console.log(hash);
    app.hash = hash;
};
watchHashChange();

window.addEventListener('hashchange', watchHashChange);
//监听hash的变化，一旦发生变化就调用watchHashChange方法
//就能拿到当前的hash值





