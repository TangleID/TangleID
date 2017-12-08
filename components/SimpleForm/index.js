const getValues = (refs) => {
	return Object.keys(refs).reduce((acc, cur) => {
		acc[cur] = refs[cur].value
		return acc
	}, {})
}

const clear = (refs) => {
	Object.keys(refs).forEach(key => refs[key].value = '')
}

const SimpleForm = (props) => {
	const refs = {}
	const { handleSubmit, name, meta } = props
	const { inputs, submit } = meta
	const formName = name

	const createInputBlock = (options) => {
		const { name, placeholder, label } = options
		const id = `${formName}-input-${name}`
		return (
			<div key={id}>
				{label && <label htmlFor={id}>{label}</label>}
				<input
					id={id}
					type="text"
					name={name}
					placeholder={placeholder}
					ref={(input) => { refs[name] = input }}
				/>
			</div>
		)
	}
	return (
		<form onSubmit={(e) => {
			e.preventDefault()
			const values = getValues(refs)
			handleSubmit(values)
			clear(refs)
		}}>
			{inputs.map(createInputBlock)}
			<div>
				<button>{submit.text ? submit.text : 'submit'}</button>
			</div>
		</form>
	)
}

export default SimpleForm
