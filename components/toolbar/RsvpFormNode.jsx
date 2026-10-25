// RSVP form — a positioned node that lives inside the canvas.
//
// Real JSX (not dangerouslySetInnerHTML): InvitationApp is loaded ssr:false, so
// this never server-renders and there is no hydration step to mismatch. The
// verbatim rsvp-fx script in useToolbar drives it by querying the DOM, so the
// classes/structure below are kept exactly: .rsvp-form-container, form,
// input[name="rsvp-name"], .ant-radio-group, .ant-radio-wrapper, .ant-radio,
// .ant-radio-input, button[type="submit"], .rsvp-form, h2. The data-transition-key
// element is the one the reveal IntersectionObserver animates in.

// Canvas top: originally 6859.04px, shifted down to clear the embedded venue map
// above it (+380, then +60 for breathing room). Kept explicit here so it moves
// with the rest of the layout when the canvas grows.
const RSVP_TOP = 7299.04;

const SCARLET = 'PlayfairDisplay';
const labelStyle = { display: 'block', marginBottom: '0.43em', fontSize: '12px' };
const radioWrapStyle = { fontSize: '12px', fontFamily: SCARLET, whiteSpace: 'break-spaces', color: '#ffc368', cursor: 'pointer' };

export function RsvpFormNode() {
  return (
    <div
      data-node-id="RqSvvEF0Hx"
      className="jsx-1768321534 rsvp-form-container"
      style={{ width: '344px', height: '282.676px', minWidth: '200px', position: 'absolute', top: `${RSVP_TOP}px`, left: '78.6px', transform: 'rotate(0deg)', cursor: 'default', zIndex: 0 }}
    >
      <div
        data-transition-key="RqSvvEF0Hx-slide-up-1.3-0.3-ease-out-false"
        data-node-id="RqSvvEF0Hx"
        style={{ transition: 'all 1.3s ease-out 0.3s', transform: 'translateY(50px)', opacity: 0, width: '100%', height: '100%' }}
      >
        <div className="jsx-1768321534" style={{ width: '100%', height: '100%', minWidth: '200px', position: 'relative', borderRadius: '5px', opacity: 1 }}>
          <div
            className="rsvp-form"
            style={{ backgroundColor: '#e0e0e0', color: '#ffc368', boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '16px', minHeight: '100%', width: '100%', fontSize: '12px', fontFamily: SCARLET, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'visible', border: '1px solid #e0e0e0' }}
          >
            <h3 style={{ marginBottom: '1.15em', color: '#ffc368', fontWeight: 500, fontFamily: SCARLET, fontSize: '18px', textAlign: 'center' }}>
              Tham dự Lễ cưới
            </h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.15em' }}>
              <div>
                <label htmlFor="rsvp-name" style={labelStyle}>Họ và tên</label>
                <input
                  type="text"
                  name="rsvp-name"
                  placeholder="Nhập tên của bạn"
                  defaultValue=""
                  style={{ width: '100%', padding: '0.29em 0.57em', borderRadius: '4px', border: '1px solid #e0e0e0', fontSize: '12px', backgroundColor: 'white', color: '#333' }}
                />
              </div>
              <div>
                <label htmlFor="rsvp-attendance" style={labelStyle}>Bạn sẽ tham dự lễ cưới chứ?</label>
                <div className="ant-radio-group ant-radio-group-outline css-var-«R36» ant-radio-css-var" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.57em' }}>
                    <label className="ant-radio-wrapper ant-radio-wrapper-checked css-var-«R36» ant-radio-css-var" style={radioWrapStyle}>
                      <span className="ant-radio ant-wave-target ant-radio-checked">
                        <input className="ant-radio-input" type="radio" name="rsvp-attendance" defaultChecked value="yes" />
                        <span className="ant-radio-inner" />
                      </span>
                      <span className="ant-radio-label" style={{ fontSize: '12px' }}>Có, tôi sẽ tham dự</span>
                    </label>
                    <label className="ant-radio-wrapper css-var-«R36» ant-radio-css-var" style={radioWrapStyle}>
                      <span className="ant-radio ant-wave-target">
                        <input className="ant-radio-input" type="radio" name="rsvp-attendance" value="no" />
                        <span className="ant-radio-inner" />
                      </span>
                      <span className="ant-radio-label" style={{ fontSize: '12px' }}>Tôi không thể<br />tham dự</span>
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#000000', color: '#ffc368', padding: '0.43em 0.86em', borderRadius: '4px', border: 'none', fontSize: '12px', cursor: 'pointer', marginTop: '0.57em', opacity: 1 }}
              >
                Gửi xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
