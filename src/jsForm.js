export const jsForm = {
    ele: document.querySelector('#js-form'),
    inputs: {},
    _createInput(id, name = undefined, inputWrapperItems = []) {
        if (name === undefined) name = id.charAt(0).toUpperCase() + id.slice(1)
        const wrapper = document.createElement('div')
        wrapper.classList.add('js-form-wrapper')
        const inputWrapper = document.createElement('div')
        inputWrapper.classList.add('js-form-input-wrapper')
        const input = document.createElement('input')
        input.id = id
        input.name = id
        const label = document.createElement('label')
        label.htmlFor = id
        label.innerText = name
        inputWrapper.append(label)
        inputWrapper.append(input)
        inputWrapperItems.forEach(x => inputWrapper.append(x))
        wrapper.append(inputWrapper)

        this.inputs[id] = {}
        this.inputs[id].input = input


        return wrapper
    },
    _createListItem(val) {
        const li = document.createElement('li')
        li.innerText = val

        return li
    },
    _createComboBox(id, name = undefined, items = [], f, inputWrapperItems) {
        const comboBox = this._createInput(id, name, inputWrapperItems)
        f(comboBox)

        const list = document.createElement('ul')
        items = items
            .map(i => this._createListItem(i))
        items
            .map(i => list.append(i))
        comboBox.append(list)

        this.inputs[id].ele = comboBox
        this.inputs[id].items = items
        this.inputs[id].list = list


        return this.inputs[id]
    },
    addInput(id, name = undefined, items = []) {
        const input = this._createInput(id, name)
        input.classList.add('js-form-input')
        this.inputs[id].ele = input
        this.inputs[id].type = 'input'

        return this
    },
    addAppendBox(id, name = undefined, items = []) {
        const btn = document.createElement('button')
        btn.innerText = '+'

        const appendBox = this._createComboBox(id, name, items, appendBox => {
            appendBox.classList.add('js-form-appendBox')
        }, [btn])
        appendBox.type = 'appendBox'

        btn.addEventListener('click', e => {
            const val = appendBox.input.value
            if (val === '') return
            appendBox.list.append(this._createListItem(val))
            appendBox.input.value = ''
        })

        return this
    },
    addSearchBox(id, name = undefined, items = []) {
        const searchBox = this._createComboBox(id, name, items, searchBox => {
            searchBox.classList.add('js-form-searchBox')
        })

        searchBox.type = 'searchBox'

        const inputs = Object.values(this.inputs).filter(i => i.type === 'searchBox')
        inputs.forEach(input => {
            input.items.forEach(item => {
                item.addEventListener('click', e => {
                    input.input.value = item.innerText
                })
            })
            input.input.addEventListener('input', e => input.items
                .forEach(item =>
                    item.innerText.toLowerCase().match(input.input.value.toLowerCase())
                        ? item.classList.remove('hidden')
                        : item.classList.add('hidden')
                )
            )
        })

        return this
    },
    render() {
        const inputs = Object.values(this.inputs)
        inputs.forEach(i => this.ele.append(i.ele))
    }
}
