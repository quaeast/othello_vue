import {
    Switch,Button
} from "ant-design-vue";
const ant = {
    install(Vue) {
        Vue.component(Switch.name, Switch);
        Vue.component(Button.name, Button);
    },
};
export default ant;
