<template>
  <div class="editor-wrapper">
    <!-- editor button -->
    <editor-menu-bar
      :editor="editor"
      v-slot="{ commands, isActive, getMarkAttrs }"
    >
      <!-- v-slot="{ commands, isActive, getMarkAttrs, menu }" -->
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <span class="iconfont">&#xe63a;</span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <span class="iconfont">&#xe622;</span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <span class="iconfont">&#xe668;</span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <span class="iconfont">&#xe600;</span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <span class="iconfont">&#xe614;</span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <span class="iconfont">&#xe636;</span>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <span class="iconfont">&#xe60d;</span>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <span class="iconfont">&#xe601;</span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <span class="iconfont">&#xe60a;</span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <span class="iconfont">&#xe6d7;</span>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <span class="iconfont">&#xe60c;</span>
        </button>

        <button class="menubar__button" @click="commands.horizontal_rule">
          <span class="iconfont">&#xe797;</span>
        </button>

        <button class="menubar__button" @click="commands.undo">
          <span class="iconfont">&#xe608;</span>
        </button>

        <button class="menubar__button" @click="commands.redo">
          <span class="iconfont">&#xe6bf;</span>
        </button>

        <div
          class="menububble"
          :class="{ 'is-active': isActive.link() }"
          style="display: inline-block;"
        >
          <!-- :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`" -->
          <form
            class="menububble__form"
            v-if="linkMenuIsActive"
            @submit.prevent="setLinkUrl(commands.link, linkUrl)"
          >
            <input
              class="menububble__input"
              type="text"
              v-model="linkUrl"
              placeholder="https://"
              ref="linkInput"
              @keydown.esc="hideLinkMenu"
            />
            <button
              class="menububble__button"
              @click="setLinkUrl(commands.link, null)"
              type="button"
            >
              <span class="iconfont">&#xe61f;</span>
            </button>
          </form>

          <template v-else>
            <button
              class="menububble__button"
              @click="showLinkMenu(getMarkAttrs('link'))"
              :class="{ 'is-active': isActive.link() }"
            >
              <span>{{ isActive.link() ? "Update Link" : "Add Link" }}</span>
              <span class="iconfont">&#xe645;</span>
            </button>
          </template>
        </div>

        <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)"
        >
          <span class="iconfont">&#xe71b;</span>
        </button>

        <button
          class="menubar__button"
          @click="
            commands.createTable({
              rowsCount: 3,
              colsCount: 3,
              withHeaderRow: false
            })
          "
        >
          <span class="iconfont">&#xe821;</span>
        </button>

        <span v-if="isActive.table()">
          <button class="menubar__button" @click="commands.deleteTable">
            <span class="iconfont">&#xe638;</span>
          </button>
          <button class="menubar__button" @click="commands.addColumnBefore">
            <span class="iconfont">&#xe604;</span>
          </button>
          <button class="menubar__button" @click="commands.addColumnAfter">
            <span class="iconfont">&#xe603;</span>
          </button>
          <button class="menubar__button" @click="commands.deleteColumn">
            <span class="iconfont">&#xf1f4;</span>
          </button>
          <button class="menubar__button" @click="commands.addRowBefore">
            <span class="iconfont">&#xe605;</span>
          </button>
          <button class="menubar__button" @click="commands.addRowAfter">
            <span class="iconfont">&#xe609;</span>
          </button>
          <button class="menubar__button" @click="commands.deleteRow">
            <span class="iconfont">&#xe606;</span>
          </button>
          <button class="menubar__button" @click="commands.toggleCellMerge">
            <span class="iconfont">&#xea12;</span>
          </button>
        </span>
      </div>
    </editor-menu-bar>
    <!-- editor context -->
    <editor-content class="editor__content" :editor="editor" />
    <el-button v-if="html.length" @click="handlerContentSend"
      >send content</el-button
    >
    <el-dialog
      title="添加图片"
      :visible.sync="imagesDialogVis"
      :close-on-click-modal="false"
      width="30%"
    >
      <div class="image-wrapper">
        <el-form :model="imageForm" ref="bannerDialog" label-width="100px">
          <el-upload
            ref="upload_wrap"
            class="upload-demo"
            action
            :limit="1"
            list-type="picture-card"
            :file-list="fileList"
            :on-remove="handleRemoveThumb"
            :on-change="handleChangeThumbnail"
            :on-exceed="onExceed"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imagesDialogVis = false">取 消</el-button>
        <el-button type="primary" @click="saveImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
// import { qiNiuUploadImages } from "@/api/qiniu";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from "tiptap-extensions";

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link({
            openOnClick: false
          }),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Table({
            resizable: true
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow()
        ],
        content: ``,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
        }
      }),
      linkUrl: null,
      linkMenuIsActive: false,
      imagesDialogVis: false,
      imageForm: {},
      fileList: [],
      qnFile: "",
      commandDom: null,
      json: "",
      html: ""
    };
  },
  mounted() {},
  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },

    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },

    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },

    showImagePrompt(command) {
      this.imagesDialogVis = true;
      this.commandDom = command;
    },

    // save image
    saveImage() {
      if (!this.qnFile) {
        this.$message.error("请上传图片");
        return;
      }
      // const file = this.qnFile;
      //   上传图片功能
      //   qiNiuUploadImages(file)
      //     .then(result => {
      //       console.log("images____", result);
      //       const {
      //         data: { baseURL, key }
      //       } = result;
      //       const PICTRURE_URL = `${baseURL}${key}`;
      //       this.commandDom({ src: PICTRURE_URL });
      //       this.imagesDialogVis = false;
      //     })
      //     .catch(e => {
      //       console.log("error images", e);
      //       this.$message.error("图片上传失败,请重新上传");
      //     });
    },

    // 保存内容
    handlerContentSend() {
      console.log("json", this.json);
      console.log("html", this.html);
    },

    // image events
    handleRemoveThumb() {
      // 删除图片资源
      this.fileList = [];
      this.qnFile = "";
    },

    handleChangeThumbnail(file, fileList) {
      this.fileList = fileList;
      this.qnFile = file;
    },
    onExceed() {
      this.$message.warning("很抱歉，只能上传一张图片");
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    imagesDialogVis(val) {
      if (!val) {
        console.log("watch imagesDialogVis key", val);
        this.imagesDialogVis = false;
        this.commandDom = null;
        this.fileList.length = 0;
      }
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
