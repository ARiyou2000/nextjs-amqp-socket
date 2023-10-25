const initSocket = async () => {
    try {
        return await fetch("/api/init_socket_server");
    } catch (e) {
        throw e
    }
}
export default initSocket