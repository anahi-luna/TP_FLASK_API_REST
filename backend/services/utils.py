def normalize_data(data):
    return {
        k: v.upper()if isinstance(v,str) else v
        for k,v in data.items()

    }