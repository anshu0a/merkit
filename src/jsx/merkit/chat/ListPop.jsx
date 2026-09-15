import { useEffect, useState, useRef } from "react";
import "../../../css/merkit/chat-css/pop.css"
import api from "../../../help/api"
import { timeAgo } from "../../../help/time";

import Alert from "../../../help/Alert";
import Loading from "../../../help/chat/loading"

export default function ListPop({ setPop }) {
    const [list, setList] = useState({ list: [], last: false, no: 0 })
    const [data, setData] = useState({ msg: "", alertTyp: "", listLoading: false, deleteLoading: false })
    const loadingRef = useRef(false);

    function close() {
        setPop((pre) => ({ ...pre, listPop: false }));
    }
    useEffect(() => {
        loadAllChat()
    }, [])

    async function loadAllChat() {
        if (loadingRef.current) return;
        loadingRef.current = true;
        try {
            setData((pre) => ({ ...pre, listLoading: true }))
            const res = await api.get("/aichat", {
                params: {
                    page: list.no,
                    size: 6
                }
            });
            const result = res.data;
            setList((pre) => ({ ...pre, list: [...pre.list, ...result.content], no: result.number + 1, last: result.last }))

        } catch (e) {
            console.log(" err:-> ", e)
            setData({ msg: e.message || "Error while fetching chatList.", alertTyp: "er" })
        } finally {
            loadingRef.current = false;
            setData((pre) => ({ ...pre, listLoading: false }))
        }


    }
    async function deleteChatRequest(e, id) {
        e.stopPropagation(true);
        if (loadingRef.current || data.deleteLoading) return;
        loadingRef.current = true;
        setData((pre) => ({ ...pre, deleteLoading: true }))

        try {
            const res = await api.delete(`/aichat/${id}`);
            const result = res.data;
            console.log(result)
            if (result.success) {
                setData({ msg: result.message, alertTyp: "su" });

                const index = list.list.findIndex(item => item.chatId === id);
                if (index !== -1) list.list.splice(index, 1);
            
            }

        } catch (e) {
            console.log(" err:-> ", e)
            setData({ msg: e.message || "Error while fetching chatList.", alertTyp: "er" })
        } finally {
            loadingRef.current = false;
            setData((pre) => ({ ...pre, deleteLoading: false }))
        }
    }


    return (
        <div onClick={close} className="pop isFlex glass">
            <div onClick={(e) => e.stopPropagation()} className="box">
                <h4>Chat History</h4>
                <div className="data isFlex">


                    {list.list != [] ?
                        <> {
                            list.list.map((one) => (
                                <div key={one.chatId} onClick={() => window.location.href = `/merkit/bot/${one.chatId}`} className="cover clk isFlex wd">
                                    <div className="secx isFlex ">
                                        <svg className="prtx prtxImp isFlex " viewBox="0 0 24 24" fill="none" >
                                            <path d="M13.064 18.6L11.054 12.465C10.9636 12.0699 11.0827 11.656 11.3693 11.3694C11.656 11.0827 12.0698 10.9636 12.465 11.054L18.6 13.064C18.82 13.0971 18.9899 13.2746 19.0134 13.4959C19.0369 13.7171 18.9081 13.9264 18.7 14.005L15.816 15.317C15.5898 15.4163 15.4092 15.5969 15.31 15.823L14 18.707C13.9213 18.9151 13.7121 19.044 13.4908 19.0205C13.2696 18.9969 13.0921 18.827 13.059 18.607L13.064 18.6Z" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M6.552 11.957C6.96621 11.957 7.302 11.6212 7.302 11.207C7.302 10.7928 6.96621 10.457 6.552 10.457V11.957ZM5 10.457C4.58579 10.457 4.25 10.7928 4.25 11.207C4.25 11.6212 4.58579 11.957 5 11.957V10.457ZM11.958 5C11.958 4.58579 11.6222 4.25 11.208 4.25C10.7938 4.25 10.458 4.58579 10.458 5H11.958ZM10.458 6.552C10.458 6.96621 10.7938 7.302 11.208 7.302C11.6222 7.302 11.958 6.96621 11.958 6.552H10.458ZM16.1273 7.34833C16.4202 7.05544 16.4202 6.58056 16.1273 6.28767C15.8344 5.99478 15.3596 5.99478 15.0667 6.28767L16.1273 7.34833ZM13.9667 7.38767C13.6738 7.68056 13.6738 8.15544 13.9667 8.44833C14.2596 8.74122 14.7344 8.74122 15.0273 8.44833L13.9667 7.38767ZM8.44533 15.0303C8.73822 14.7374 8.73822 14.2626 8.44533 13.9697C8.15244 13.6768 7.67756 13.6768 7.38467 13.9697L8.44533 15.0303ZM6.28467 15.0697C5.99178 15.3626 5.99178 15.8374 6.28467 16.1303C6.57756 16.4232 7.05244 16.4232 7.34533 16.1303L6.28467 15.0697ZM7.34533 6.29067C7.05244 5.99778 6.57756 5.99778 6.28467 6.29067C5.99178 6.58356 5.99178 7.05844 6.28467 7.35133L7.34533 6.29067ZM7.38467 8.45133C7.67756 8.74422 8.15244 8.74422 8.44533 8.45133C8.73822 8.15844 8.73822 7.68356 8.44533 7.39067L7.38467 8.45133ZM6.552 10.457H5V11.957H6.552V10.457ZM10.458 5V6.552H11.958V5H10.458ZM15.0667 6.28767L13.9667 7.38767L15.0273 8.44833L16.1273 7.34833L15.0667 6.28767ZM7.38467 13.9697L6.28467 15.0697L7.34533 16.1303L8.44533 15.0303L7.38467 13.9697ZM6.28467 7.35133L7.38467 8.45133L8.44533 7.39067L7.34533 6.29067L6.28467 7.35133Z" fill="white"></path>
                                        </svg>
                                        <div className="prtx isFlex ">
                                            <p className="lstx1 flow wd">{one.name}</p>
                                            <p className="lstx2 flow wd">{one.question} messages | <span className={one.saved ? "sx" : "snx"}>{!one.saved ? "Not " : ""}saved</span></p>
                                        </div>
                                    </div>
                                    <div className="secx secxImp flow isFlex ">
                                        <p className="wd flow">{timeAgo(one.dateStamp)}</p>
                                        <svg onClick={(e) => { deleteChatRequest(e, one.chatId) }} className="clk" viewBox="-.5 1 24 24" >
                                            <path d="M10.6117 12.3094C10.3225 12.0128 9.84769 12.0068 9.55111 12.296C9.25453 12.5852 9.24852 13.06 9.53769 13.3566L10.6117 12.3094ZM11.163 15.0236C11.4522 15.3202 11.927 15.3262 12.2236 15.037C12.5202 14.7478 12.5262 14.273 12.237 13.9764L11.163 15.0236ZM9.53769 15.6434C9.24852 15.94 9.25453 16.4148 9.55111 16.704C9.84769 16.9932 10.3225 16.9872 10.6117 16.6906L9.53769 15.6434ZM12.237 15.0236C12.5262 14.727 12.5202 14.2522 12.2236 13.963C11.927 13.6738 11.4522 13.6798 11.163 13.9764L12.237 15.0236ZM13.8623 13.3566C14.1515 13.06 14.1455 12.5852 13.8489 12.296C13.5523 12.0068 13.0775 12.0128 12.7883 12.3094L13.8623 13.3566ZM11.163 13.9764C10.8738 14.273 10.8799 14.7478 11.1764 15.037C11.473 15.3262 11.9478 15.3202 12.237 15.0236L11.163 13.9764ZM12.7883 16.6906C13.0775 16.9872 13.5523 16.9932 13.8489 16.704C14.1455 16.4148 14.1515 15.94 13.8623 15.6434L12.7883 16.6906ZM12.237 13.9764C11.9478 13.6798 11.473 13.6738 11.1764 13.963C10.8799 14.2522 10.8738 14.727 11.163 15.0236L12.237 13.9764ZM13.418 6.25C13.8322 6.25 14.168 5.91421 14.168 5.5C14.168 5.08579 13.8322 4.75 13.418 4.75V6.25ZM10.1683 4.75C9.75407 4.75 9.41829 5.08579 9.41829 5.5C9.41829 5.91421 9.75407 6.25 10.1683 6.25V4.75ZM16.575 8.25C16.9892 8.25 17.325 7.91421 17.325 7.5C17.325 7.08579 16.9892 6.75 16.575 6.75V8.25ZM6.82501 6.75C6.4108 6.75 6.07501 7.08579 6.07501 7.5C6.07501 7.91421 6.4108 8.25 6.82501 8.25V6.75ZM7.53894 18.7678L7.00194 19.2913L7.00194 19.2913L7.53894 18.7678ZM6.82501 17H7.57501H6.82501ZM9.53769 13.3566L11.163 15.0236L12.237 13.9764L10.6117 12.3094L9.53769 13.3566ZM10.6117 16.6906L12.237 15.0236L11.163 13.9764L9.53769 15.6434L10.6117 16.6906ZM12.7883 12.3094L11.163 13.9764L12.237 15.0236L13.8623 13.3566L12.7883 12.3094ZM13.8623 15.6434L12.237 13.9764L11.163 15.0236L12.7883 16.6906L13.8623 15.6434ZM13.418 4.75H10.1683V6.25H13.418V4.75ZM16.575 6.75H6.82501V8.25H16.575V6.75ZM7.63719 10.25H15.7628V8.75H7.63719V10.25ZM15.7628 10.25C15.7739 10.25 15.7864 10.2535 15.8001 10.2676C15.8142 10.2819 15.825 10.3037 15.825 10.333H17.325C17.325 9.47675 16.6434 8.75 15.7628 8.75V10.25ZM15.825 10.333V17H17.325V10.333H15.825ZM15.825 17C15.825 17.9845 15.0517 18.75 14.1375 18.75V20.25C15.9157 20.25 17.325 18.7769 17.325 17H15.825ZM14.1375 18.75H9.26251V20.25H14.1375V18.75ZM9.26251 18.75C8.82117 18.75 8.39395 18.5704 8.07594 18.2442L7.00194 19.2913C7.59816 19.9029 8.41092 20.25 9.26251 20.25V18.75ZM8.07594 18.2442C7.7573 17.9174 7.57501 17.4702 7.57501 17H6.07501C6.07501 17.8559 6.40634 18.6805 7.00194 19.2913L8.07594 18.2442ZM7.57501 17V10.333H6.07501V17H7.57501ZM7.57501 10.333C7.57501 10.3037 7.58587 10.2819 7.59989 10.2676C7.61359 10.2535 7.62614 10.25 7.63719 10.25V8.75C6.75664 8.75 6.07501 9.47675 6.07501 10.333H7.57501Z" ></path>
                                        </svg>
                                    </div>
                                </div>
                            ))
                        }
                            {!list.last && <div onClick={() => { loadAllChat() }} className="loadMore clk"> - Load More -</div>}
                        </> : <>
                            <img src="/img/empty.png" alt="" className="emty" />
                            <p>Chat list is empty</p>
                        </>
                    }
                </div>
            </div>
            <Alert msg={data.msg} typ={data.alertTyp} setMsg={setData} />
            {data.listLoading && <Loading msg="Loading . . ." />}
        </div>
    )
}