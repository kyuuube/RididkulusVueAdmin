export const getNode = (id, nodes, customId) => {
    for (const node of nodes) {
        if (id === node[customId]) {
            return node;
        }
        if (node.children && node.children.length > 0) {
            const result = getNode(id, node.children, customId);
            if (result === null) {
                continue;
            } else {
                return result;
            }
        }
    }
    return null;
};
